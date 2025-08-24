const TwoStackWM = {
    moveWindow: function(window, geometry) {
        window.frameGeometry = geometry;
    },

    isPortrait: function(geom) {
        return (geom.width < geom.height);
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

    isMaxed: function(window) {
        var maxed = workspace.clientArea(KWin.MaximizeArea, window);
        var geom = window.frameGeometry;
        return geom.x == maxed.x && geom.width >= (1/2 * maxed.width);
    },

    maxify: function(window) {
        var maxed = workspace.clientArea(KWin.MaximizeArea, window);
        this.moveWindow(window, maxed);
    },

    isInSideStack: function(window) {
        var maxed = workspace.clientArea(KWin.MaximizeArea, window);
        return window.frameGeometry.x == maxed.x;
    },

    moveToSideStack: function(window) {
        this.moveWindow(window, this.sideGeometry(window))
    },

    moveToMainStack: function(window) {
        this.moveWindow(window, this.mainGeometry(window))
    },

    moveToMainOrSide: function(window) {
        if (this.isInSideStack(window)) {
            this.moveToMainStack(window);
        } else {
            this.moveToSideStack(window);
        }
    },

    moveToMainOrSideOrMaxed: function(window) {
        if (this.isMaxed(window)) {
            this.moveToMainStack(window);
        } else if (this.isInSideStack(window)) {
            this.maxify(window);
        } else {
            this.moveToSideStack(window);
        }
    },

    registerShortcuts: function() {
        registerShortcut(
            "TwoStackWM: move between main / side / maxed",
            "TwoStackWM: move between main / side / maxed",
            "Ctrl+Shift+Alt+Return",
            function () {
                const window = workspace.activeWindow;
                if (window) this.moveToMainOrSideOrMaxed(window);
            }.bind(this)
        );

        registerShortcut(
            "TwoStackWM: move to main or side stack",
            "TwoStackWM: move to main or side stack",
            "Ctrl+Alt+Return",
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
