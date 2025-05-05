const TwoStackWM = {
    moveWindow: function(window, geometry) {
        window.frameGeometry.x = geometry.x;
        window.frameGeometry.y = geometry.y;
        window.frameGeometry.height = geometry.height;
        window.frameGeometry.width = geometry.width;
    },

    sideGeometry: function(window) {
        var maxed = workspace.clientArea(KWin.MaximizeArea, window);
        return {
            x: maxed.x,
            y: maxed.y,
            width: 1/3 * maxed.width,
            height: maxed.height
        }
    },

    mainGeometry: function(window) {
        var maxed = workspace.clientArea(KWin.MaximizeArea, window);
        return {
            x: maxed.x + 1/3 * maxed.width,
            y: maxed.y,
            width: 2/3 * maxed.width,
            height: maxed.height
        }
    },

    moveToSideStack: function(window) {
        this.moveWindow(window, this.sideGeometry(window))
    },

    moveToMainStack: function(window) {
        this.moveWindow(window, this.mainGeometry(window))
    },

    moveToMainOrSide: function(window) {
        if (window.frameGeometry.x == 0) {
            this.moveToMainStack(window);
        } else {
            this.moveToSideStack(window);
        }
    },

    registerShortcuts: function() {
        registerShortcut(
            "TwoStackWM: move to main or side stack",
            "TwoStackWM: move to main or side stack",
            "Ctrl+Shift+Alt+Return",
            function () {
                const window = workspace.activeWindow;
                if (window) this.moveToMainOrSide(window);
            }.bind(this)
        );

        registerShortcut(
            "TwoStackWM: move to side stack",
            "TwoStackWM: move to side stack",
            "Ctrl+Alt+Left",
            function () {
                const window = workspace.activeWindow;
                if (window) this.moveToSideStack(window);
            }.bind(this)
        );

        registerShortcut(
            "TwoStackWM: move to main stack",
            "TwoStackWM: move to main stack",
            "Ctrl+Alt+Right",
            function () {
                const window = workspace.activeWindow;
                if (window) this.moveToMainStack(window);
            }.bind(this)
        );
    },

    init: function() {
        this.registerShortcuts()
    }
};

TwoStackWM.init();
