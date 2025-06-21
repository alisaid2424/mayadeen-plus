import { Link } from "@/i18n/navigation";
import routes from "../../utils/routes";

const links = [
  { key: "contact", href: routes.contact },
  { key: "liveBroadcast", href: routes.liveBroadcast },
  { key: "contests", href: routes.contests },
  { key: "services", href: routes.services },
  { key: "about", href: routes.about },
];

interface Props {
  onClick?: () => void;
  trans: (key: string) => string;
}

const NavLinks = ({ onClick, trans }: Props) => (
  <>
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          onClick={onClick}
          className="text-sm lg:text-base block whitespace-nowrap hover:text-yellow-600 ltr:tracking-normal"
        >
          {link.key === "contests" ? (
            <span className="flex items-center gap-1">
              {trans(`nav.${link.key}`)}
              <span className="text-yellow-400">+</span>
            </span>
          ) : (
            trans(`nav.${link.key}`)
          )}
        </Link>
      </li>
    ))}
  </>
);

export default NavLinks;
