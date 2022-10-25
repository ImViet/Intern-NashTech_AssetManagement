using FluentValidation.Results;
using Rookie.AssetManagement.Validators;
using System;
using System.Linq.Expressions;

namespace Rookie.AssetManagement.Tests.Validations
{
    public class ValidationTestResult<TValidator, TModel>
        where TValidator : BaseValidator<TModel>
        where TModel : class, new()
    {
        private readonly TValidator _validator;
        private ValidationResult _validationResult;

        internal ValidationTestResult(TValidator validator) => _validator = validator;

        public bool IsValid => _validationResult.IsValid;

        public ValidationTestResult<TValidator, TModel> ShouldHaveErrorsFor<TProperty>(
            Expression<Func<TModel, TProperty>> expression,
            params string[] errors)
        {
            _validationResult.Should().HaveErrorsFor(expression, errors);

            return this;
        }

        public ValidationTestResult<TValidator, TModel> ShouldNotHaveErrorsFor<TProperty>(
            Expression<Func<TModel, TProperty>> expression)
        {
            _validationResult.Should().NotHaveErrorsFor(expression);

            return this;
        }

        internal ValidationTestResult<TValidator, TModel> Validate(TModel model)
        {
            _validationResult = _validator.Validate(model);

            return this;
        }
    }
}
