(function (global) {
    var default_attribute = 'data-dynodul8-heightmatch';

    function buildSelector(group_name) {
        if (!group_name) {
            return '*[' + default_attribute + ']';
        } else {
            return '*[' + default_attribute + '="' + group_name + '"]';
        }
    }

    function register_height_match_groups(selector) {
        function do_height_match() {
            if (!selector) {
                find_groups(buildSelector(), function (groupName) {
                    match_group_heights(buildSelector(groupName));
                });
            } else {
                match_group_heights(selector);
            }
        }

        jQuery(window).on('resize', do_height_match);
        do_height_match();
    }
    
    function find_groups(selector, callback) {
        var match_height_groups = {};
        jQuery(selector).each(function (i, elem) {
            var group = jQuery(elem).attr(default_attribute);
            if (!match_height_groups[group]) {
                match_height_groups[group] = 1;
                
                callback(group);
            }
        });
    }
    
    function match_group_heights(selector, group_name) {
        var levels = {};
        var group;
    
        jQuery(selector).each(function (i, elem) {
            jQuery(elem).height('auto');
        });
    
        jQuery(selector).each(function (i, elem) {
            var index = jQuery(elem).position().top;
            var group = levels[index] = (levels[index] || {height: 0, elements: []});
            
            group.height = Math.max(group.height, jQuery(elem).height());
            group.elements.push(jQuery(elem));
        });
        
        for (var level in levels) {
            if (levels.hasOwnProperty(level) && levels[level].elements.length) {
                for (var elem in levels[level].elements) {
                    levels[level].elements[elem].height(levels[level].height);
                }
            }
        }
    }

    // Export the global function to register other attributes    
    global.dynodul8 = {heightmatch: register_height_match_groups};

    jQuery(function() {
        // Register the default attribute automatically
        register_height_match_groups();
    });
}(window));
