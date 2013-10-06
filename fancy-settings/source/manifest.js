function pluralize(n, unit) {
  return n + ' ' + unit + (n === 1 ? '' : 's');
}
this.manifest = {
    'name': 'TabMortality',
    'settings': [
        {
            'tab': 'Settings',
            'group': 'Timelimits',
            'name': 'timeout',
            'type': 'slider',
            'label': 'Tab timeout',
            'max': 24 * 60,
            'min': 10,
            'step': 10,
            'display': true,
            'displayModifier': function (value) {
              if (value < 60) return value + ' minutes';
              var hours = Math.floor(value / 60);
              var minutes = value - hours * 60;
              return pluralize(hours, 'hour') + (
                minutes === 0 ? '' : ' ' + pluralize(minutes, 'minute')
              );
            }
        },
        {
            'tab': 'Settings',
            'group': 'Timelimits',
            'name': 'timeout-description',
            'type': 'description',
            'text': 'How long may tab stay ignored before it is parked'
        }
    ],
    'alignment': [
        [
            'timeout'
        ]
    ]
};
