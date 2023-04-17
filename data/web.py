from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField


class HelpingForm(FlaskForm):
    problem = TextAreaField("Опишите Вашу проблему")
    geo = StringField("Ваш адрес")
    number = StringField("Ваш номер")
    submit = SubmitField('Отправить')
