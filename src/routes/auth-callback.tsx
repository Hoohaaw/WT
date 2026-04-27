import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Supabase auto-processes the PKCE code on client init.
        // Check if the session is already set, otherwise wait for the auth event.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/dashboard", { replace: true });
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                navigate("/dashboard", { replace: true });
            }
            if (event === "SIGNED_OUT") {
                navigate("/login", { replace: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Signing you in…</p>
        </div>
    );
}
