import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export type ActiveLinkProps = {
    children: React.ReactNode;
} & LinkProps;


const ActiveLink = ({ href, children, ...rest }: ActiveLinkProps) => {


    const pathname = usePathname();

    const isCurrentPath = pathname === href || pathname === rest.as || pathname?.startsWith(String(rest.as));
    
    return (
        
        <Link legacyBehavior {...rest} href={href}>
            <a className="activeLink">
                {children}
            </a>
        </Link>        
    )
    


}

export default ActiveLink;