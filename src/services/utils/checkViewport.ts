// src/utils/checkViewport.ts

interface Visibility {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}

export const checkVisibility = (element: HTMLElement | null): Visibility => {
    if (!element) {
        return { left: false, right: false, top: false, bottom: false };
    }

    const rect = element.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    const isLeftHidden = rect.left < 0;
    const isRightHidden = rect.right > innerWidth;
    const isTopHidden = rect.top < 0;
    const isBottomHidden = rect.bottom > innerHeight;

    return {
        left: isLeftHidden,
        right: isRightHidden,
        top: isTopHidden,
        bottom: isBottomHidden,
    };
};
