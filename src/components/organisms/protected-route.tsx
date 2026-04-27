import { Navigate } from "react-router";
import { useSession } from "../../hooks/use-session";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session, loading } = useSession();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Loading…</p>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
