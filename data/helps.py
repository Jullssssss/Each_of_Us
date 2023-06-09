import sqlalchemy
from flask_login import UserMixin
from sqlalchemy import orm
from .db_session import SqlAlchemyBase


class Help(SqlAlchemyBase, UserMixin):
    __tablename__ = 'helps'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    problem = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    geo = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    number = sqlalchemy.Column(sqlalchemy.String, nullable=True)

    # хз, что это вообще
    news = orm.relation("News", back_populates='user')

    def __repr__(self):
        return f'<Help> {self.id} {self.problem} {self.geo}'
