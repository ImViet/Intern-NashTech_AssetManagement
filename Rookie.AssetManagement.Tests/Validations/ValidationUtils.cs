using FluentValidation;
using FluentValidation.Internal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Rookie.AssetManagement.Tests.Validations
{
    /// <summary>
    /// ValidationUtils.
    /// </summary>
    public static class ValidationUtils
    {
        private static readonly Regex _indexRegex = new Regex(@"\.get_Item\((\d+)\)", RegexOptions.Compiled);

        /// <summary>
        /// GetPropertyName.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static string GetPropertyName<T, TProperty>(Expression<Func<T, TProperty>> expression)
        {
            string queryName = ValidatorGetQueryName((expression.Body as MemberExpression)?.Member);
            if (queryName != null)
            {
                return queryName;
            }

            string chain = _indexRegex.Replace(expression.Body.ToString(), "[$1]");

            return PascalToCamelCase(chain, Constants.Dot.ToString(), 1);
        }

        /// <summary>
        /// SetupValidatorOptions.
        /// </summary>
        public static void SetupValidatorOptions()
        {
            // modified version of default property name resolver to use camelCase for nested child properties
            // https://github.com/JeremySkinner/FluentValidation/blob/ba7d130504db52df20e62b77d3930c6135ec6fdd/src/FluentValidation/ValidatorOptions.cs#L85
            ValidatorOptions.Global.PropertyNameResolver = (type, memberInfo, expression) =>
                ValidatorPropertyNameResolver(memberInfo, expression);
        }

        internal static string ValidatorGetQueryName(MemberInfo memberInfo)
        {
            if (memberInfo != null)
            {
                FromQueryAttribute fromQueryAttribute = memberInfo.GetCustomAttribute<FromQueryAttribute>();
                if (fromQueryAttribute != null && !string.IsNullOrEmpty(fromQueryAttribute.Name))
                {
                    return fromQueryAttribute.Name;
                }

                FromRouteAttribute fromRouteAttribute = memberInfo.GetCustomAttribute<FromRouteAttribute>();
                if (fromRouteAttribute != null && !string.IsNullOrEmpty(fromRouteAttribute.Name))
                {
                    return fromRouteAttribute.Name;
                }
            }

            return null;
        }

        private static string ValidatorPropertyNameResolver(MemberInfo memberInfo, LambdaExpression expression)
        {
            string queryName = ValidatorGetQueryName(memberInfo);
            if (queryName != null)
            {
                return queryName;
            }

            if (expression != null)
            {
                var chain = PropertyChain.FromExpression(expression);

                if (chain.Count == 1)
                {
                    return chain.ToString();
                }

                if (chain.Count > 1)
                {
                    return PascalToCamelCase(chain.ToString(), ValidatorOptions.Global.PropertyChainSeparator, 0);
                }
            }

            return ValidatorGetDefaultName(memberInfo);
        }

        private static string ValidatorGetDefaultName(MemberInfo memberInfo) => memberInfo?.Name;

        private static string PascalToCamelCase(string chain, string separator, int skip)
        {
            return string.Join(
                separator,
                chain
                    .Split(separator)
                    .Skip(skip)
                    .Select(property => property));
        }
    }
}
