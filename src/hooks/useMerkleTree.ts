import { useEffect, useMemo, useState } from "react";
import { MERKLE_TREES } from "../constants";
import axios from "axios";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useNetwork } from "wagmi";

function useMerkleJson() {
  const { chain } = useNetwork()
  const url = useMemo(() => !chain || chain?.unsupported ? undefined : MERKLE_TREES[chain.id] as any, [chain])
  const [data, setData] = useState<undefined | any>(undefined)
  useEffect(() => {
    if (!url) return
    const fetchData = async (url: string) => {
      const result = await axios(url)
      setData(JSON.stringify(result.data))
    }
    fetchData(url)
  }, [url])
  return useMemo(() => data ? JSON.parse(data) : undefined, [data])
}

export function useMerkleTree() {
  const { chain } = useNetwork();
  const tree = useMerkleJson()
  return useMemo(() => {
    if (!chain || chain.unsupported || !tree ) return;
    return StandardMerkleTree.load(tree as any);
  }, [chain, tree]);
}

export function useMerkleProof(address?: string) {
  const tree = useMerkleTree();
  return useMemo(() => {
    if (!tree || !address) return { loading: true };

    const leaf = Array.from(tree.entries()).find(([i, val]) => {
      return val[0].toLowerCase() === address.toLowerCase();
    });
    if (!leaf) return { found: false };

    return {
      found: true,
      leafIndex: leaf[0],
      amount: BigInt(leaf[1][1]),
      proof: tree.getProof(leaf[0]),
    };
  }, [tree, address]);
}
