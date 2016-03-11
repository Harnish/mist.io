define('app/controllers/team_edit', ['ember'],
    //
    //  Team Edit Controller
    //
    //  @returns Class
    //
    function() {

        'use strict';

        return Ember.Object.extend({

            //
            //  Properties
            //

            team: null,
            newName: '',
            newDescription: '',
            formReady: null,

            //
            //  Methods
            //

            open: function(team) {
                this.setProperties({
                    team: team,
                    newName: team.name,
                    newDescription: team.description
                });
                this._updateFormReady();
                this.view.open();
            },

            close: function() {
                this.view.close();
            },

            save: function() {
                if (this.formReady) {
                    var that = this;
                    Mist.teamsController.renameTeam({
                        team: this.get('team'),
                        newName: this.get('newName'),
                        newDescription: this.get('newDescription'),
                        callback: function(success) {
                            if (success)
                                that.close();
                        }
                    });
                }
            },

            //
            // Private Methods
            //

            _updateFormReady: function() {
                var formReady = false;
                if (this.team &&
                    (this.newName != this.team.name)) {
                    formReady = true;
                }
                this.set('formReady', formReady);
            },

            //
            //  Observers
            //

            formObserver: function() {
                Ember.run.once(this, '_updateFormReady');
            }.observes('newName')
        });
    }
);