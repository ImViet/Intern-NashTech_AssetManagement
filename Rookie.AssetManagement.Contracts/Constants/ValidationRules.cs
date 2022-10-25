namespace Rookie.AssetManagement.Contracts.Constants
{
    public static class ValidationRules
    {
        public static class Common
        {
            public const int MinLenghCharactersForText = 0;
            public const int MaxLenghCharactersForText = 255;
        }

        public static class Category
        {
            public const int MinLenghCharactersForName = 0;
            public const int MaxLenghCharactersForName = 50;

            public const int MinLenghCharactersForCode = 0;
            public const int MaxLenghCharactersForCode = 20;
        }
    }
}
