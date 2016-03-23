/**
 * @file
 *
 * right click menu
 */
var RightMenu = function (targetEl, menuEl) {
	var self = this;
	this.menuEl = menuEl;
	this.targetEl = targetEl;
	this.showMenuEl = function () {
		menuEl.style.display = 'block';
		menuEl.style.position = 'absolute';
		menuEl.style.left = event.clientX + 'px';
		menuEl.style.top = event.clientY + 'px';
	};
	this.hideMenuEl = function () {
		menuEl.style.display = 'none';
	}

	this.showRightMenuHandler = function (event) {
		self.showRightMenu(event);
	}
	this.hideRightMenuHandler = function (event) {
		self.hideRightMenu(event);
	}
}

RightMenu.prototype = new Object();
RightMenu.prototype.constructre = RightMenu;

var proto = RightMenu.prototype;

proto.hasParent = function (el, parentEl) {
	if (!el || !parentEl) {
		return false;
	}

	while (el && el != parentEl) {
		el = el.parentNode || false;
	}

	return (el !=  false);
}

proto.enableRightMenu = function (value) {
	var self = this;
	var prohibitRightMenu = function (event) {
		return false;
	}

	// if IE
	if (window.document.all) {
		document.attachEvent('oncontextmenu', prohibitRightMenu);
		this.targetEl.attachEvent('onmouseup', this.showRightMenuHandler, false);
	} 
	// if !IE
	else {
		document.oncontextmenu = prohibitRightMenu;
		this.targetEl.addEventListener('mouseup', this.showRightMenuHandler, false);
	}
}

proto.showRightMenu = function (event) {
	// must be right click
	if (2 !== event.button) {
		return;
	}

	this.showMenuEl();

	// if IE
	if (window.document.all) {
		this.targetEl.attachEvent('onmousedown', this.hideRightMenuHandler);
		this.targetEl.attachEvent('onmousewheel', this.hideRightMenuHandler);
	} 
	// if !IE
	else {
		// IE >= 9 supoort addEventListener
		document.addEventListener('mousedown', this.hideRightMenuHandler, false);
		document.addEventListener('mousewheel', this.hideRightMenuHandler, false);
		document.addEventListener('DOMMouseScroll', this.hideRightMenuHandler, false);
	}
}

proto.hideRightMenu = function (event, force) {
	if (event instanceof MouseEvent) {
		var clickedTarget = event.srcElement || event.target;
		if (this.hasParent(clickedTarget, this.menuEl) && !force) {
			return false;
		}
	}

	this.hideMenuEl();

	// if IE
	if (window.document.all) {
		this.targetEl.detachEvent('onmousedown', this.hideRightMenuHandler);
		this.targetEl.detachEvent('onmousewheel', this.hideRightMenuHandler);
	} 
	// if !IE
	else {
		// IE >= 9 supoort addEventListener
		document.removeEventListener('mousedown', this.hideRightMenuHandler, false);
		document.removeEventListener('mousewheel', this.hideRightMenuHandler, false);
		document.removeEventListener('DOMMouseScroll', this.hideRightMenuHandler, false);
	}
}

