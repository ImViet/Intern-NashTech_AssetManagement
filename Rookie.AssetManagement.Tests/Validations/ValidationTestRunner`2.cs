using FluentValidation;
using Rookie.AssetManagement.Validators;
using System;

namespace Rookie.AssetManagement.Tests.Validations
{
    public class ValidationTestRunner<TValidator, TModel>
        where TValidator : BaseValidator<TModel>
        where TModel : class, new()
    {
        private readonly TValidator _validator;

        internal ValidationTestRunner(TValidator validator)
        {
            _validator = validator;
        }

        public ValidationTestResult<TValidator, TModel> For(Action<TModel> init)
        {
            var model = new TModel();
            init(model);

            return new ValidationTestResult<TValidator, TModel>(_validator).Validate(model);
        }

        public ValidationTestResult<TValidator, TModel> For(TModel model)
        {
            return new ValidationTestResult<TValidator, TModel>(_validator).Validate(model);
        }
    }
}
