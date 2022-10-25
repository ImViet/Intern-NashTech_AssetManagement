using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Tests.Assertions;
using Rookie.AssetManagement.Tests.Validations;

namespace Rookie.AssetManagement.Tests
{
    public static class AssertionExtensions
    {
        public static ActionResultAssertions Should(this ActionResult actualValue)
            => new ActionResultAssertions(actualValue);

        public static ValidationResultAssertions Should(this ValidationResult actualValue)
            => new ValidationResultAssertions(actualValue);
    }
}
