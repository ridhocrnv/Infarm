import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '../lib/supabase';

type AuthContextType = {
    user: SupabaseUser | null;
    userProfile: User | null;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Function to fetch user profile
    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    // Function to refresh user profile
    const refreshUserProfile = async () => {
        if (user) {
            const profile = await fetchUserProfile(user.id);
            setUserProfile(profile);
            setIsAdmin(profile?.role === 'admin');
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            
            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id);
                setUserProfile(profile);
                setIsAdmin(profile?.role === 'admin');
            }
            
            setLoading(false);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            
            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id);
                setUserProfile(profile);
                setIsAdmin(profile?.role === 'admin');
            } else {
                setUserProfile(null);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error };
        } catch (error) {
            return { error: error as Error };
        }
    };

    const signUp = async (email: string, password: string, username: string) => {
        try {
            console.log('Starting signup process...');
            
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username
                    }
                }
            });

            if (authError) {
                console.error('Auth signup error:', authError);
                return { error: authError };
            }

            console.log('Auth signup successful:', authData);

            if (authData.user) {
                // Wait for auth state to be established
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log('Inserting user profile with ID:', authData.user.id);
                
                // Insert user profile into our custom users table
                const { data: insertData, error: userError } = await supabase.from('users').insert({
                    id: authData.user.id,
                    email,
                    username,
                    password: '',
                    role: 'user',
                }).select();

                if (userError) {
                    console.error('Error inserting user profile:', userError);
                    // If it's a duplicate key error, the user might already exist
                    if (userError.code === '23505') {
                        console.log('User profile already exists, continuing...');
                        return { error: null };
                    }
                    return { error: userError };
                }

                console.log('User profile inserted successfully:', insertData);
            }

            return { error: null };
        } catch (error) {
            console.error('Signup error:', error);
            return { error: error as Error };
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            // Clear local state
            setUser(null);
            setUserProfile(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            userProfile, 
            loading, 
            isAdmin, 
            signIn, 
            signUp, 
            signOut, 
            refreshUserProfile 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
