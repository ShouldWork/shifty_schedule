  // login with third-party provider
        function login(provider) {
            var auth = $firebaseAuth();
            return auth.$signInWithPopup(provider)
                .then(loginSuccess)
                .catch(loginError);
        }

        function loginWithEmail(email, password) {
            var auth = $firebaseAuth();
            return auth.$createUserWithEmailAndPassword(email, password)
                .then(function () {
                    auth.$signInWithEmailAndPassword(email, password)
                        .then(loginSuccess)
                        .catch(loginError);
                }, function (error) {
                    if (error.code == "auth/weak-password") {
                        loginError(error);
                    } else if (error.code === "auth/email-already-in-use") {
                        auth.$signInWithEmailAndPassword(email, password)
                            .then(loginSuccess)
                            .catch(loginError);
                    } else {
                        $log.error(error);
                    }
                })
                .catch(loginError);
        }

        function logout() {
            var auth = $firebaseAuth();
            $log.log(self.displayName + " logged out");
            auth.$signOut();
        }

        // User private functions
        function loginSuccess(firebaseUser) {
            var deferred = $q.defer();
            $log.log(firebaseUser);

            var providerUser = firebaseUser.user ? firebaseUser.user : firebaseUser;
            var ref = firebase.database().ref("users");
            var profileRef = ref.child(providerUser.uid);
            self.user = $firebaseObject(profileRef);
            self.user.$loaded().then(function () {
                if (!self.user.displayName) {
                    $log.log("updating user...");
                    profileRef.set({
                        displayName: providerUser.displayName || providerUser.email,
                        email: providerUser.email,
                        photoURL: providerUser.photoURL,
                        lastLogin: firebase.database.ServerValue.TIMESTAMP
                    }).then(function () {
                        $log.log("user updated.");
                    }, function () {
                        $log.log("user could not be updated.");
                    });
                } else {
                    $log.log('user already created!');
                }
                self.displayName = providerUser.displayName;
                deferred.resolve();
            });
            return deferred.promise;
        }

        function loginError(error) {
            $log.log("Authentication failed:", error);
        }
