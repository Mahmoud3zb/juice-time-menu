import React from "react";
import { Card, Box, TextField, InputAdornment, Chip } from "@mui/material";
import { Search, LocalOffer } from "@mui/icons-material";

interface ProductCategoryBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categoriesList: string[];
  totalFiltered: number;
}

export const ProductCategoryBar: React.FC<ProductCategoryBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categoriesList,
  totalFiltered,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        p: 2.5,
        border: "1px solid #f1f5f9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Search Input & Count Badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="ابحث باسم المشروب (مثال: مانجو، فراولة، أفوكادو، ميلك شيك...)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5, fontWeight: 700, bgcolor: "grey.50" },
            },
          }}
        />

        <Chip
          icon={<LocalOffer sx={{ fontSize: 16 }} />}
          label={`${totalFiltered} صنف`}
          sx={{
            fontWeight: 900,
            fontSize: 13,
            px: 1,
            py: 2.2,
            borderRadius: 1.5,
            bgcolor: "primary.light",
            color: "primary.main",
          }}
        />
      </Box>

      {/* Categories Pills Carousel */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          overflowX: "auto",
          pb: 0.5,
          "&::-webkit-scrollbar": { height: 4 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "grey.200", borderRadius: 4 },
        }}
      >
        <Chip
          label="الكل"
          onClick={() => onSelectCategory("الكل")}
          sx={{
            fontWeight: 800,
            cursor: "pointer",
            px: 1,
            border: "none",
            bgcolor: selectedCategory === "الكل" ? "#009a74" : "#f1f5f9",
            color: selectedCategory === "الكل" ? "#ffffff" : "#64748b",
            "&:hover": {
              bgcolor: selectedCategory === "الكل" ? "#008262" : "#e2e8f0",
            },
          }}
        />

        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              label={cat}
              onClick={() => onSelectCategory(cat)}
              sx={{
                fontWeight: 800,
                cursor: "pointer",
                px: 1,
                whiteSpace: "nowrap",
                border: "none",
                bgcolor: isSelected ? "#009a74" : "#f1f5f9",
                color: isSelected ? "#ffffff" : "#64748b",
                "&:hover": {
                  bgcolor: isSelected ? "#008262" : "#e2e8f0",
                },
              }}
            />
          );
        })}
      </Box>
    </Card>
  );
};
