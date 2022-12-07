using System;
using FluentValidation;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;

public class CreateAssetDTOValidator : AbstractValidator<AssetCreateDto> {
    public CreateAssetDTOValidator(){
        RuleFor(asset => asset.AssetName)
            .NotEmpty()
            .WithMessage("Asset Name is empty");
        RuleFor(asset => asset.Category)
            .NotEmpty()
            .WithMessage("Category is empty");
        RuleFor(asset => asset.Specification)
            .NotEmpty()
            .WithMessage("Specification is empty");
        RuleFor(asset => asset.InstalledDate)
            .NotEmpty()
            .WithMessage("Installed Date is empty");
        RuleFor(asset => asset.State)
            .NotEmpty()
            .WithMessage("State is empty");
    }
}