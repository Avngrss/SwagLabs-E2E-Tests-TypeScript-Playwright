import { Locator, Page } from "@playwright/test";
import { BaseActions } from "../utils/BaseActions";
import { SocialLink } from "../types/socialLinks";

export class FooterComponent {

    private base: BaseActions;
    //Locators
    readonly socialTwitter: Locator;
    readonly socialFacebook: Locator;
    readonly socialLinkedin: Locator;

    private readonly socialLinks: SocialLink[];

    constructor(page: Page) {
        this.base = new BaseActions(page);

        this.socialTwitter = page.locator('[data-test="social-twitter"]');
        this.socialFacebook = page.locator('[data-test="social-facebook"]');
        this.socialLinkedin = page.locator('[data-test="social-linkedin"]');

        this.socialLinks = [
            {
                locator: this.socialTwitter,
                url: 'https://twitter.com/saucelabs ',
                name: 'Twitter'
            },
            {
                locator: this.socialFacebook,
                url: 'https://www.facebook.com/saucelabs ',
                name: 'Facebook'
            },
            {
                locator: this.socialLinkedin,
                url: 'https://www.linkedin.com/company/sauce-labs/ ',
                name: 'LinkedIn'
            }
        ];
    }

    async getAllSocialLinks(): Promise<SocialLink[]> {
        return this.socialLinks;
    }

    async clickTwitter(): Promise<void> {
        await this.base.clickElement(this.socialTwitter);
    }

    async isAllLinksVisible(): Promise<boolean> {
        const visibility = await Promise.all(
            this.socialLinks.map(link => this.base.verifyElementVisible(link.locator))
        );
        return visibility.every(visible => visible);
    }
}