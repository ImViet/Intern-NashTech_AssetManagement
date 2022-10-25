using System;
using System.Reflection;

namespace Rookie.AssetManagement.Business
{
    public static class EnumConverExtension
    {
        public static string GetNameString<T>(this T enumType) where T : Enum
        {
            return Enum.GetName(typeof(T), enumType);
        }
    }
}