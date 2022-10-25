using System;
using System.Globalization;

namespace Rookie.AssetManagement.Contracts
{
    public class ErrorException : Exception
    {
        public ErrorException() : base()
        {
        }

        public ErrorException(string message) : base(message)
        {
        }

        public ErrorException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}