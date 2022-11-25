using System;
using FluentValidation;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;


public class UpdateUserDTOValidator : AbstractValidator<UserUpdateDto>
{
    public UpdateUserDTOValidator()
    {

        RuleFor(user => user.DateOfBirth)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("Please Select Date of Birth")
            .LessThan(DateTime.Now.AddYears(-18))
            .WithMessage("User is under 18, please select different date");

        RuleFor(user => user.JoinedDate)
            .Cascade(CascadeMode.Stop)
            .GreaterThanOrEqualTo(user => user.DateOfBirth.AddYears(+18))
            .WithMessage("User under the age of 18 may not join company. Please select a different date");

        RuleFor(user => user.JoinedDate.DayOfWeek)
            .NotEqual(DayOfWeek.Sunday)
            .WithMessage("Joined date is Saturday or Sunday. Please select a different date");

    }

}