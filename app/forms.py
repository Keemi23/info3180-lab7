from flask_wtf import FlaskForm
from wtforms.validators import InputRequired
from flask_wtf.file import FileAllowed, FileRequired, FileField 
from wtforms import TextAreaField, SelectField


class UploadForm(FlaskForm):
    description = TextAreaField("Description", validators=[InputRequired()])
    photo = FileField("Photo", validators=[FileRequired(), FileAllowed(['jpg','png','jpeg'], 'Only image files accepted.')])
