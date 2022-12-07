using System;
using FluentValidation;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
public class UpdateAssignmentDTOValidator : AbstractValidator<AssignmentUpdateDto>
{
    public UpdateAssignmentDTOValidator()
    {
        RuleFor(assginment => assginment.User)
           .NotEmpty()
           .WithMessage("User is empty");
        RuleFor(assginment => assginment.Asset)
           .NotEmpty()
           .WithMessage("Asset is empty");
        RuleFor(assginment => assginment.AssignedDate)
           .NotEmpty()
           .WithMessage("Assgined Date is empty")
           .GreaterThanOrEqualTo(DateTime.Today)
           .WithMessage("Assgined Date is less than day now");
        RuleFor(assginment => assginment.Note)
           .NotEmpty()
           .WithMessage("Note is empty");
    }
}