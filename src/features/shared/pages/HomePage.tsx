import clsx from "clsx";
import { FaFolder, FaPen, FaTag } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TargetedEvent } from "../shared.types";

const menu = [
  {
    title: "Create",
    link: "/posts/create",
    Icon: FaPen,
    description: "Create post",
  },
  { title: "Posts", link: "/posts", Icon: FaFile, description: "Read Posts" },
  {
    title: "Tags",
    link: "/tags",
    Icon: FaTag,
    description: "Search & Explore Posts by Tag",
  },
  {
    title: "Category",
    link: "/categories",
    Icon: FaFolder,
    description: "Organize Posts",
  },
];

type MenuItem = (typeof menu)[number];

const Card = ({ title, link, Icon, description }: MenuItem) => {
  const navigate = useNavigate();

  const handleLink = ({ currentTarget }: TargetedEvent) => {
    const link = currentTarget.dataset.link as string;
    navigate(link);
  };

  return (
    <li
      className="w-full text-base-100 h-44 xl:h-56 bg-success/80 rounded xl:w-2/5 flex-grow flex flex-col cursor-pointer hover:bg-success transition justify-center"
      data-link={link}
      onClick={handleLink}
    >
      <h3 className="text-center text-2xl font-extrabold">{title}</h3>

      <Icon className="size-10 mx-auto mt-5" />
      <span className="text-center mt-3">{description}</span>
    </li>
  );
};

export default function HomePage() {
  return (
    <div className="w-full flex">
      <div className="w-full">
        <ul
          className={clsx(
            "flex flex-col w-full gap-8  p-8  md:px-28 items-center justify-center",
            "xl:flex-row xl:flex-wrap xl:px-8 "
          )}
        >
          {menu.map((item) => (
            <Card {...item} key={item.link} />
          ))}
        </ul>
      </div>
    </div>
  );
}
