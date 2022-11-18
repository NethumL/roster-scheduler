from locust import HttpUser, task


class Main(HttpUser):
    @task
    def login(self):
        self.client.get("/auth/login")
        self.client.post(
            "/api/login", json={"username": "admin", "password": "password"}
        )
