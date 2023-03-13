import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export type ActiveLinkProps = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} & LinkProps;


const ActiveLink = ({ href, children, onClick, ...rest }: ActiveLinkProps) => {


    const pathname = usePathname();

    const isCurrentPath = pathname === href || pathname === rest.as || pathname?.startsWith(String(rest.as));
    
    return (
        
        <Link legacyBehavior {...rest} href={href}>
            <a className="activeLink" onClick={onClick}>
                {children}
            </a>
        </Link>        
    )
    


}

export default ActiveLink;