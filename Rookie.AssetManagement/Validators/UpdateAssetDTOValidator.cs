using System;
using FluentValidation;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;

public class UpdateAssetDTOValidator : AbstractValidator<AssetUpdateDto> {
    public UpdateAssetDTOValidator(){
        RuleFor(asset => asset.AssetName)
            .NotEmpty()
            .WithMessage("Asset Name is empty");
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