import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import type { Recipe } from "@/types";

type RecipeFormValues = Recipe;

export default function RecipeForm({
  onSubmit,
}: {
  onSubmit: (data: RecipeFormValues) => void;
}) {
  const form = useForm<RecipeFormValues>({
    defaultValues: {
      title: "",
      description: "",
      ratings: [],
      imageUrl: "",
      timeInMins: 0,
      price: 0,
      categories: [],
      instructions: [],
      ingredients: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const categories = useFieldArray<RecipeFormValues, any, "categories">({
    control,
    name: "categories",
  });

  const instructions = useFieldArray<RecipeFormValues, any, "instructions">({
    control,
    name: "instructions",
  });

  const ingredients = useFieldArray<RecipeFormValues, any, "ingredients">({
    control,
    name: "ingredients",
  });

  const submit = (data: RecipeFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <Field>
        <FieldLabel htmlFor="title">Titel</FieldLabel>
        <Controller
          control={control}
          name="title"
          rules={{ required: "Titel är obligatoriskt" }}
          render={({ field }) => <Input id="title" {...field} />}
        />
        <FieldError>{errors.title?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="description">Beskrivning</FieldLabel>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea id="description" rows={4} {...field} />
          )}
        />
        <FieldError>{errors.description?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="imageUrl">Bild-URL</FieldLabel>
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => <Input id="imageUrl" {...field} />}
        />
        <FieldError>{errors.imageUrl?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="price">Pris</FieldLabel>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              id="price"
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          )}
        />
        <FieldError>{errors.price?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="timeInMins">Tid i minuter</FieldLabel>
        <Controller
          control={control}
          name="timeInMins"
          render={({ field }) => (
            <Input
              id="timeInMins"
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          )}
        />
        <FieldError>{errors.timeInMins?.message}</FieldError>
      </Field>

      <FieldSet>
        <FieldLegend>Kategorier</FieldLegend>
        <FieldGroup className="space-y-2">
          {categories.fields.map((cat, idx) => (
            <Field key={`${cat}${idx}`}>
              <FieldLabel>Kategori {idx + 1}</FieldLabel>
              <Controller
                control={control}
                name={`categories.${idx}`}
                render={({ field }) => <Input {...field} />}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => categories.remove(idx)}
              >
                Ta bort
              </Button>
            </Field>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => categories.append("")}
          >
            Lägg till kategori
          </Button>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Instruktioner</FieldLegend>
        <FieldGroup className="space-y-2">
          {instructions.fields.map((step, idx) => (
            <Field key={`${step}${idx}`}>
              <FieldLabel>Steg {idx + 1}</FieldLabel>
              <Controller
                control={control}
                name={`instructions.${idx}`}
                render={({ field }) => <Textarea rows={3} {...field} />}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => instructions.remove(idx)}
              >
                Ta bort
              </Button>
            </Field>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => instructions.append("")}
          >
            Lägg till steg
          </Button>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Ingredienser</FieldLegend>
        <FieldGroup className="space-y-4">
          {ingredients.fields.map((ing, idx) => (
            <div
              key={`${ing}${idx}`}
              className="grid grid-cols-4 gap-2 items-end"
            >
              <Field>
                <FieldLabel>Namn</FieldLabel>
                <Controller
                  control={control}
                  name={`ingredients.${idx}.name`}
                  render={({ field }) => <Input {...field} />}
                />
                <FieldError>
                  {errors.ingredients?.[idx]?.name?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Mängd</FieldLabel>
                <Controller
                  control={control}
                  name={`ingredients.${idx}.amount`}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                <FieldError>
                  {errors.ingredients?.[idx]?.amount?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Enhet</FieldLabel>
                <Controller
                  control={control}
                  name={`ingredients.${idx}.unit`}
                  render={({ field }) => <Input {...field} />}
                />
                <FieldError>
                  {errors.ingredients?.[idx]?.unit?.message}
                </FieldError>
              </Field>

              <Button
                type="button"
                variant="destructive"
                onClick={() => ingredients.remove(idx)}
              >
                Ta bort
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              ingredients.append({ name: "", amount: 0, unit: "" })
            }
          >
            Lägg till ingrediens
          </Button>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="w-full">
        Spara recept
      </Button>
    </form>
  );
}