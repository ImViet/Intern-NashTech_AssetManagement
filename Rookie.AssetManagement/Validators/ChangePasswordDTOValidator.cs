using System;
using FluentValidation;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;

public class ChangePasswordDTOValidator: AbstractValidator<ChangePasswordDto>
{
    public ChangePasswordDTOValidator()
    {
        RuleFor(password => password.PasswordOld)
            .NotEmpty()
            .WithMessage("Current password is required");

        RuleFor(password => password.PasswordNew)
            .NotEmpty()
            .WithMessage("New password cannot be empty")
            .NotEqual(password => password.PasswordOld)
            .WithMessage("new password cannot be the same as old password");
    }

}