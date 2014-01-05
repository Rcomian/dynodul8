dynodul8
========

# Description

The heightmatch module allows you to design a page with horizontal panels of the same height without restricting you to a fixed height set of panels.

# Basic usage

First include the module in your page, for example:

    <script type="text/javascript" src="dynodul8/lib/heightmatch.js"></script>

Design the panels in whatever way you desire, then add the following attribute to the divs that need to be the same height:

    <div data-dynodul8-heightmatch="1">Content</div>

The module will then find the tallest panel with that tag and set all the panels to that height.

When the page is resized, the panels are also resized, so that the panels are allowed to change width dynamically according to the display.

The panels could wrap so that they're not all on the same horizontal level. Only panels on the same horizontal level are matched with each other.

If you have more than 1 group of panels on the page that each need their own heights matching, you can avoid conflicts by changing the value of the attribute for each group, from 1 to 2 (or any value you like, so long as the different groups get a different value).

# Dependencies

The heightmatch module uses jquery through the reference: jQuery.
jQuery must be included before the heightmatch module.

# Details

The heightmatch module searches for groups of elements that:
  Have a matching data-dynodul8-heightmatch value.
  Are drawn on the same vertical position on the page.

Each group is treated separately, each get their own heights.
First, each tagged element has its height set to "auto", so that we determine how tall it should be based on content. If your element relies on a fixed height, it should not be tagged with data-dynodul8-heightmatch.
Within each group, we find the tallest element.
We then set the height of each element within each group to match the height of the tallest element in that group.

This works with any element (div, li, span, etc) provided they have been set to a display mode that allows their height to be set explicitly (eg, display: block or display: inline-block).

The module registers a handler which is run once the DOM is ready. It also registers a handler to resize the panels whenever the window is resized.

# Advanced

You can match the height of any group of elements, just pass in a jQuery selector:

    dynodul8.heightmatch(<selector>);


