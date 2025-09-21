import type { CustomizeFormValuesType } from "../models/Institution/Customize.model";

export let defaultTheme = {
  general: {
    header: "#d5b370",
    background: "#f8f1e5",
    steps: "#3e2c1c",
    selectedSteps: "#9c3d24",
    primaryButton: "#9c3d24",
    secondaryButton: "#a9a27a",
  },
  users: {
    permissions: {
      admin: "#d6b370",
      modification: "#6d625a",
      readOnly: "#6c7a89",
    },
    roles: {
      director: "#6d625a",
      researcher: "#a9a27a",
    },
  },
};

export class ThemeManager {
  private static instance: ThemeManager;
  private styleElement: HTMLStyleElement | null = null;

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private constructor() {
    this.initializeStyleElement();
  }

  private initializeStyleElement(): void {
    this.styleElement = document.getElementById(
      "dynamic-theme"
    ) as HTMLStyleElement;
    if (!this.styleElement) {
      this.styleElement = document.createElement("style");
      this.styleElement.id = "dynamic-theme";
      document.head.appendChild(this.styleElement);
    }
  }

  applyTheme(themeData: CustomizeFormValuesType): void {
    if (!this.styleElement) return;

    const css = `
      :root {
        --color-neutral: #fff;
        --color-primary: ${themeData.general.primaryButton};
        --color-secondary: ${themeData.general.secondaryButton};
        --color-primary-content: #fff;
        --color-secondary-content: #fff;
        --color-header: ${themeData.general.header};
        --color-base-100: #fffcf6;
        --color-base-200: ${themeData.general.background};
        --color-base-300: ${themeData.general.selectedSteps};
        --color-base-400: ${themeData.general.primaryButton};
        --color-button-primary: ${themeData.general.primaryButton};
        --color-button-secondary: ${themeData.general.secondaryButton};
        --color-step-default: ${themeData.general.steps};
        --color-list-border: #d9d2c5;

        --color-admin: ${themeData.users.permissions.admin};
        --color-modification: ${themeData.users.permissions.modification};
        --color-read-only: ${themeData.users.permissions.readOnly};
        --color-director: ${themeData.users.roles.director};
        --color-researcher: ${themeData.users.roles.researcher};
    }`;

    this.styleElement.textContent = css;
  }

  applyDefaultTheme(): void {
    this.applyTheme(defaultTheme);
  }

  removeTheme(): void {
    if (this.styleElement) {
      this.styleElement.textContent = "";
    }
  }

  applyPreviewFromLocalStorage(): boolean {
    const previewData = localStorage.getItem("previewData");
    if (previewData) {
      try {
        const themeData = JSON.parse(previewData) as CustomizeFormValuesType;
        this.applyTheme(themeData);
        return true;
      } catch (error) {
        console.error("Error parsing preview data:", error);
        return false;
      }
    }
    return false;
  }

  updateDefaultTheme(newTheme: CustomizeFormValuesType): void {
    defaultTheme = newTheme;
    this.applyTheme(newTheme);
  }
}

export const themeManager = ThemeManager.getInstance();
