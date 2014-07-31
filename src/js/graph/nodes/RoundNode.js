webvowl.nodes.RoundNode = (function () {

	var o = function () {
		webvowl.nodes.BaseNode.call(this);

		var that = this,
			radius = 50;


		// Properties
		this.radius = function (p) {
			if (!arguments.length) return radius;
			radius = p;
			return this;
		};


		// Functions
		this.textWidth = function () {
			return this.radius() * 2;
		};

		this.toggleFocus = function () {
			that.focused(!that.focused());
			that.nodeElement().select("circle").classed("focused", that.focused());
		};

		// Reused TODO refactor
		this.drawNode = function (element, cssClasses, additionalFunction) {
			that.nodeElement(element);

			// Default circle element. The base for nearly all nodes.
			element.append("circle")
				.classed("class", true)
				.classed(that.styleClass(), true)
				.attr("r", that.radius());

			// Add all additional classes to the <circle> element which are needed by the specific class.
			if (cssClasses !== undefined) {
				cssClasses.forEach(function (cssClass) {
					if (typeof cssClass === "string") {
						element.select("circle").classed(cssClass, true);
					} else {
						console.log(cssClass + " is not a valid String to set class! - Element: " + element);
					}
				});
			}

			// If some additional style or element is need. For example equivalent class needs a second circle.
			if (additionalFunction instanceof Function) {
				additionalFunction();
			}

			// Adding the text to the node
			var textBlock = webvowl.util.textElement(element);
			textBlock.addTextline(that.label(), that.textAttribute());
			textBlock.addSubTextNode(that.indication(), that.textAttribute());

			if (that.equivalent()) {
				var equivNames = that.equivalent().map(function (node) {
						return node.label();
					}),
					equivNamesString = equivNames.join(", ");

				// TODO unused parameter
				textBlock.addEquivalentSpan(equivNamesString, that.textAttribute());
			}

			textBlock.repositionTextBlock();
			that.addMouseListeners();
		};
	};
	o.prototype = Object.create(webvowl.nodes.BaseNode.prototype);
	o.prototype.constructor = o;

	return o;
}());