import { memo } from "react";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const footerText = `© ${currentYear} MyBlog. All rights reserved.`;

  return (
    <footer className="w-full h-40 bg-neutral-200 items-center flex justify-center mt-48">
      {footerText}
    </footer>
  );
});

export default Footer;
