export interface FavoriteButtonProps {
    eventId: string;
    isFavorite?: boolean;
    onToggle?: (newStatus: boolean) => void;
    className?: string;
}