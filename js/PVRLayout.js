
PVR.module("PVRLayout", function(PVRLayout, App, Backbone, Marionette, $, _){
    // Define a controller to run this module
    // --------------------------------------
    PVRLayout.ListViewContainer = Marionette.Layout.extend({
        template: '#template-list-view',
        listView: new App.PVRView.ListView(),
        currentSelectedRow: null,

        regions: {
            listbox: "#listbox",
            note_box: "#notebox"
        },

        events: {
            'click .clickable_row': 'rowClicked'
        },

        rowClicked: function(event) {
            $("#rightpane-div1").html($(event.currentTarget).children("#rec_title")[0].innerHTML);
            $("#rightpane-div2").html($(event.currentTarget).children("#rec_date")[0].innerHTML);
            $("#rightpane-div3").html($(event.currentTarget).children("#rec_type")[0].innerHTML);
        },

        onRender: function () {
            var context = this;
            this.listView.loadPage(function(view){
                context.listbox.show(view);

                context.postRender();
            });
        },

        postRender: function () {
            var context = this;
            $('#notebox').fadeOut(1000);

            // register scrolling event
            $('#leftpane').scroll(function () {
                if($(this).scrollTop() + $(this).outerHeight() == $(this)[0].scrollHeight ) {
                    $('#notebox').fadeIn(1000);

                    setTimeout(function(){
                        //fetch data
                        context.listView.loadPage(function(view){
                            context.listbox.show(view);

                            // hide notification box
                            $('#notebox').fadeOut(1000);
                        });
                    }, 1500);
                }
            });
        }
    });
});