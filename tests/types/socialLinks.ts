import { Locator } from "@playwright/test";

export type SocialLink = {
  locator: Locator;
  url: string;
  name: string;
};
