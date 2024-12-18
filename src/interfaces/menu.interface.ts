export interface MenuProps {
    id: string;
    title: string;
    link?: string;
    subMenus?: { id: string; title: string; link: string }[];
    isNewFeature?: boolean;
}
