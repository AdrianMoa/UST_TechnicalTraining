import { useAuth } from "../auth/useAuth";

export const Profile = () => {
    const { user } = useAuth();
    if(!user) return <p>You are not authenticated.</p>

    return (
        <div>
            <h2>User profile</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};