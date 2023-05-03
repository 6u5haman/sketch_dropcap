var onRun = function(context) {
  // Get the selected paragraph
  var selectedLayers = context.selection;
  if (selectedLayers.length == 0) {
    context.document.showMessage("Please select a paragraph.");
  } else {
    var selectedLayer = selectedLayers[0];
    if (selectedLayer.class() != "MSTextLayer") {
      context.document.showMessage("Please select a text layer.");
    } else {
      // Get the first character
      var text = selectedLayer.stringValue();
      var firstChar = text.substring(0, 1);
      // Add 2 spaces at the beginning of the text
      var newText = "  " + text.substring(1);

      // Remove the first character from the text layer
      // var newText = text.substring(1);
      selectedLayer.setStringValue(newText);

      // Create the drop cap layer
      var dropCap = MSTextLayer.alloc().init();
      dropCap.setStringValue(firstChar);
      dropCap.setFontSize(selectedLayer.fontSize() * 3);
      dropCap.setFontPostscriptName(selectedLayer.fontPostscriptName());
      dropCap.setTextColor(selectedLayer.textColor());
      dropCap.setTextBehaviour(1);
      dropCap.frame().setWidth(dropCap.fontSize());
      dropCap.frame().setHeight(dropCap.fontSize());

      // Position the drop cap layer relative to the selected layer
      var selectedRect = selectedLayer.absoluteRect();
      var dropCapRect = dropCap.frame();
      dropCapRect.setX(selectedRect.x() - 200);
      dropCapRect.setY(selectedRect.y() - 235);

      // Add the drop cap layer to the parent group
      var parentGroup = selectedLayer.parentGroup();
      parentGroup.addLayers([dropCap]);
    }
  }
};