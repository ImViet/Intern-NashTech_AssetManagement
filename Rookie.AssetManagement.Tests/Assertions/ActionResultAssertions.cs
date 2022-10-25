using EnsureThat;
using FluentAssertions.Execution;
using FluentAssertions.Primitives;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;

namespace Rookie.AssetManagement.Tests.Assertions
{
    public class ActionResultAssertions : ReferenceTypeAssertions<ActionResult, ActionResultAssertions>
    {
        public ActionResultAssertions(ActionResult actionResult)
            => Subject = actionResult;

        protected override string Identifier => nameof(ActionResultAssertions);

        public void HaveStatusCode(int expectedStatusCode)
            => HaveStatusCode(expectedStatusCode, string.Empty);

        public void HaveStatusCode(int expectedStatusCode, string because, params object[] becauseArgs)
        {
            int? actualStatusCode = (Subject as IStatusCodeActionResult)?.StatusCode;

            Execute.Assertion
                .ForCondition(actualStatusCode == expectedStatusCode)
                .BecauseOf(because, becauseArgs)
                .FailWith(Constants.FailWithStatusCodeMessage, expectedStatusCode, actualStatusCode);
        }

        public void HaveRedirectUrl(string expectedUrl)
            => HaveRedirectUrl(expectedUrl, string.Empty);

        public void HaveRedirectUrl(string expectedUrl, string because, params object[] becauseArgs)
        {
            Ensure.String.IsNotNullOrWhiteSpace(expectedUrl, nameof(expectedUrl));

            string actualUrl = (Subject as RedirectResult)?.Url;

            Execute.Assertion
                .ForCondition(string.Equals(actualUrl, expectedUrl, StringComparison.Ordinal))
                .BecauseOf(because, becauseArgs)
                .FailWith(Constants.FailWithRedirectUrlMessage, expectedUrl, actualUrl);
        }
    }
}
