<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Spring Leaderboard</title>

    <!-- Load react main.tsx -->
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
</head>
<body>
    <!-- React app -->
    <div id="react-root">

<!--    <h1>Spring Leaderboard</h1>-->
<!--    <hr/>-->
<!--    <ul id="users-list">-->
<!--        <li>Loading users...</li>-->
<!--    </ul>-->
<!---->
<!--    <!--- Scripts --->-->
<!--    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>-->
<!--    <script>-->
<!--        function fetchUsers(){-->
<!--            $.ajax({-->
<!--                url: "/api/users", // API endpoint to fetch users-->
<!--                type: "GET",-->
<!--                dataType: "json",-->
<!--                success: function(data) {-->
<!--                    $("#users-list").empty(); // Clear the existing list-->
<!--                    if (data.length === 0) {-->
<!--                        $("#users-list").append("<li>No users found.</li>");-->
<!--                    } else {-->
<!--                        data.forEach(function(user) {-->
<!--                            $("#users-list").append(`<li>${user.name} - ${user.email}</li>`);-->
<!--                        });-->
<!--                    }-->
<!--                },-->
<!--                error: function() {-->
<!--                    $("#users-list").html("<li>Error fetching users.</li>");-->
<!--                }-->
<!--            });-->
<!--        }-->
<!---->
<!--        function updatePoints(userId, action) {-->
<!--            fetch(`/api/user/${userId}/update-points`, {-->
<!--                method: 'POST',-->
<!--                headers: {-->
<!--                    'Content-Type': 'application/json',-->
<!--                    'Accept': 'application/json',-->
<!--                },-->
<!--                body: JSON.stringify({ action: action }),-->
<!--            })-->
<!--                .then(response => {-->
<!--                    const data = response.json();-->
<!--                    console.log(data);-->
<!--                })-->
<!--        }-->
<!---->
<!--        $(document).ready(function() {-->
<!--            fetchUsers();-->
<!--        });-->
<!--    </script>-->
<!--    <!--- /Scripts --->-->
</body>
</html>
