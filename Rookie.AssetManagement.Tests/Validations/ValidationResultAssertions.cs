using FluentAssertions;
using FluentAssertions.Primitives;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Rookie.AssetManagement.Tests.Validations
{
    public class ValidationResultAssertions : ReferenceTypeAssertions<ValidationResult, ValidationResultAssertions>
    {
        public ValidationResultAssertions(ValidationResult validationResult)
            => Subject = validationResult;

        protected override string Identifier => nameof(ValidationResultAssertions);

        public void HaveErrorsFor<T, TProperty>(
            Expression<Func<T, TProperty>> expression,
            params string[] errors)
            => HaveErrorsFor(expression, errors, string.Empty);

        public void HaveErrorsFor<T, TProperty>(
            Expression<Func<T, TProperty>> expression,
            string[] errors,
            string because,
            params object[] becauseArgs)
        {
            string propertyName = ValidationUtils.GetPropertyName(expression);

            IEnumerable<string> actualErrors = GetPropertyErrors(propertyName);

            IEnumerable<string> expectedErrors = errors.Select(error => TransformPropertyName(error, propertyName));

            if (string.IsNullOrEmpty(because))
            {
                because = GetOtherErrors(propertyName);
            }

            actualErrors.Should().Contain(
                expectedErrors,
                because,
                becauseArgs);
        }

        public void NotHaveErrorsFor<T, TProperty>(Expression<Func<T, TProperty>> expression)
            => NotHaveErrorsFor(expression, string.Empty);

        public void NotHaveErrorsFor<T, TProperty>(
            Expression<Func<T, TProperty>> expression,
            string because,
            params object[] becauseArgs)
        {
            string propertyName = ValidationUtils.GetPropertyName(expression);

            IEnumerable<string> actualErrors = GetPropertyErrors(propertyName);

            actualErrors.Should().BeEmpty(because, becauseArgs);
        }

        private static string TransformPropertyName(string error, string propertyName) =>
            error.Replace("{PropertyName}", propertyName, StringComparison.Ordinal);

        private IEnumerable<string> GetPropertyErrors(string propertyName)
            => Subject.Errors.Where(error => error.PropertyName == propertyName).Select(error => error.ErrorMessage);

        private string GetOtherErrors(string propertyName)
        {
            string otherErrors = string.Join(
                Environment.NewLine,
                Subject.Errors.Where(error => error.PropertyName != propertyName).Select(error =>
                    string.Format(Constants.PropertyErrorMessage, error.PropertyName, error.ErrorMessage)));

            otherErrors = string.IsNullOrEmpty(otherErrors)
                ? Constants.NoOtherErrorsWereFoundMessage
                : string.Format(Constants.OtherErrorsWereFoundMessage, Environment.NewLine, otherErrors);

            otherErrors += string.Format(Constants.ExpectedPropertyMessage, Environment.NewLine, propertyName);

            return otherErrors;
        }
    }
}
