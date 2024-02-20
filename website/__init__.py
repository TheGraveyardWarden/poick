from flask import Flask


def create_app(settings="website.settings"):
    app = Flask(__name__)
    app.config.from_object(settings)

    from .views import phone
    app.register_blueprint(phone, url_prefix="")

    return app