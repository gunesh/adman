'use strict';

/// Initialize the services module
angular.module('AngularLessons.services', [])
/// Services below
        .factory('windowdialog', function ($window) {
            return {
                action: function (url, callback) {
                    var basic_window = $window.open(url, "Window", "width=500,height=500")
                    var window_watch = $window.setInterval(function () {
                        if (basic_window.closed) {
                            if (callback)
                                callback();
                            $window.clearInterval(window_watch);
                        }
                    }, 500);
                }
            }
        }).service('ContactService', function () {
    //to create unique contact id
    var uid = 1;

    //contacts array to hold list of all contacts
    var contacts = [{
            id: 0,
            'name': 'Kiran Joshi',
            'email': 'kiranjoshi.ce@gmail.com',
            'phone': '9913005689'
        }];

    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (var i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (var i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }

    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (var i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }
});
