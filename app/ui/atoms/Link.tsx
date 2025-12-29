import React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";

// 1. Define Props
// We merge MUI's styling props with React Router's navigation props.
export interface LinkProps extends Omit<MuiLinkProps, "href" | "component"> {
  to: RouterLinkProps["to"];
  replace?: RouterLinkProps["replace"];
  state?: RouterLinkProps["state"];
  // You can allow 'href' optionally if you want to force external behavior
  href?: string;
}

export default function Link({ to, ...props }: LinkProps) {
  // 2. Determine if it's an external link
  // If 'to' is a string starting with http/mailto, treat as external.
  const isExternal =
    typeof to === "string" &&
    (to.startsWith("http") || to.startsWith("mailto:"));

  // 3. Render External Link (Standard <a> tag styled by MUI)
  if (isExternal) {
    return (
      <MuiLink
        href={to as string}
        target="_blank" // Usually expected for external links
        rel="noopener noreferrer" // Security best practice for target="_blank"
        {...props}
      />
    );
  }

  // 4. Render Internal Link (React Router + MUI)
  return <MuiLink component={RouterLink} to={to} {...props} />;
}
