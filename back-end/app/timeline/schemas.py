from marshmallow import (Schema, ValidationError, fields, validate,
                         validates_schema)


class TimelineSchema(Schema):
    year_from = fields.Int(required=True)
    year_to = fields.Int(required=True)
    words = fields.List(
        fields.String(), required=True, validates=validate.Length(min=1)
    )

    @validates_schema(skip_on_field_errors=True)
    # pylint: disable=no-self-use
    def validate_year_from(self, data, *_, **__):
        if int(data["year_from"]) > int(data["year_to"]):
            raise ValidationError("year_from must be before year_to", "year_range")


class LatentAssociationSchema(Schema):
    year_from = fields.Int(required=True)
    year_to = fields.Int(required=True)
    concept_1 = fields.List(
        fields.String(), required=True, validates=validate.Length(min=1)
    )
    concept_2 = fields.List(
        fields.String(), required=True, validates=validate.Length(min=1)
    )

    @validates_schema(skip_on_field_errors=True)
    def validate_year_from(self, data, *_, **__):
        if data["year_from"] > data["year_to"]:
            raise ValidationError("year_from must be before year_to", "year_range")
