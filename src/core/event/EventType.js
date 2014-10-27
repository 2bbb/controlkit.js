var EventType = {
    VALUE_UPDATED             : 'valueUpdated',
    UPDATE_VALUE              : 'updateValue',

    SELECT_TRIGGERED          : 'selectTrigger',
    TRIGGER_SELECT            : 'triggerSelect',

    PANEL_MOVE_BEGIN          : 'panelMoveBegin',
    PANEL_MOVE                : 'panelMove',
    PANEL_MOVE_END            : 'panelMoveEnd',

    PANEL_SHOW                : 'panelShow',
    PANEL_HIDE                : 'panelHide',

    PANEL_SCROLL_WRAP_ADDED   : 'panelScrollWrapAdded',
    PANEL_SCROLL_WRAP_REMOVED : 'panelScrollWrapRemoved',

    SUBGROUP_TRIGGER          : 'subGroupTrigger',

    COMPONENTS_ENABLE         : 'enableCompo',
    COMPONENTS_DISABLE        : 'disableComps',

    SUBGROUP_ENABLE          : 'enableSubGroup',
    SUBGROUP_DISABLE         : 'disableSubGroup',

    INDEX_ORDER_CHANGED      : 'indexOrderChanged',
    CHANGE_INDEX_ORDER       : 'changeIndexOrder',

    SCROLL_BEGIN             : 'scrollBegin',
    SCROLL                   : 'scroll',
    SCROLL_END               : 'scrollEnd',

    INPUT_SELECTDRAG_START   : 'inputSelectDragStart',
    INPUT_SELECTDRAG         : 'inputSelectDrag',
    INPUT_SELECTDRAG_END     : 'inputSelectDragEnd',

    INPUT_SELECT_DRAG        : 'inputSelectDrag',

    HISTORY_STATE_PUSH       : 'historyStatePush',
    HISTORY_STATE_POP        : 'historyStatePop',

    GROUP_SIZE_CHANGE        : 'groupSizeChange',
    GROUP_LIST_SIZE_CHANGE   : 'groupListSizeChange',
    GROUP_SIZE_UPDATE        : 'groupSizeUpdate',

    PANEL_SIZE_CHANGE        : 'panelSizeChange',

    UPDATE_MENU            : 'updateMenu'
};

module.exports = EventType;